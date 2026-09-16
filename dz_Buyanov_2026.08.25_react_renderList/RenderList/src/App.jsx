function FruitList({ fruits }) {
	return (
		<ul>
			{fruits.map((fruit, index) => (
				<li key={index}>{fruit}</li>
			))}
		</ul>
	)
}
function App() {
	const fruits = ['Яблоко', 'Банан', 'Апельсин', 'Киви', 'Виноград']
	return (
		<div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
			<h2>Домашнее задание: Рендеринг списков</h2>
			<FruitList fruits={fruits} />
		</div>
	)
}
export default App
