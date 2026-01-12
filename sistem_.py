import os
activ_sistem = False
if os.system("mkdir my folder"):
    
    try:

        os.system("mkdir my folder")
        activ_sistem = True

    except ValueError():
        print("Директория существует")
