from django.db import connection
from django.db.models import Count, Sum
from django.shortcuts import render
from django.test.utils import CaptureQueriesContext
from django.contrib.auth.decorators import login_required, permission_required
from billing.models import Apartment


@login_required
@permission_required("users.can_view_all_payments", raise_exception=True)
def analytics(request):
    apartments = (
        Apartment.objects
        .annotate(
            payments_count=Count("payments", distinct=True),
            total_due=Sum("payments__amount_due"),
        )
        .prefetch_related("payments")
        .order_by("name")
    )

    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT a.id,
                   a.name,
                   COALESCE(SUM(pay.amount_due - pay.amount_paid), 0) AS debt
            FROM billing_apartment a
            LEFT JOIN billing_payment pay ON pay.apartment_id = a.id
            GROUP BY a.id, a.name
            ORDER BY debt DESC
        """)
        cols = [c[0] for c in cursor.description]
        debt_by_apartment = [dict(zip(cols, row)) for row in cursor.fetchall()]

    with CaptureQueriesContext(connection) as ctx:
        list(apartments)
    sql_count = len(ctx.captured_queries)

    return render(request, "billing/analytics.html", {
        "apartments": apartments,
        "debt_by_apartment": debt_by_apartment,
        "sql_count": sql_count,
    })