import { categoryOptions } from "./TransactionForm";

interface Props {
    categoryTotal: Record<string, number>
    total: number
}

export function CategoryInsights({ categoryTotal, total }: Props) {
    const categories = Object.entries(categoryTotal).map(([name, amount]) => {
        const cat = categoryOptions.find((c) => c.name === name)
        const percent = total ? (amount / total) * 100 : 0

        return {
            name,
            amount,
            percent,
            icon: cat?.icon || "📌",
            color: cat?.color || "#888",
        }
    })
        .sort((a, b) => b.percent - a.percent)


    return (
        <div className="insights-card">
            <h3>Category Insights</h3>

            <div className="insights-list">
                {categories.map((cat) => (
                    <div className="insight-row" key={cat.name}>

                        <div className="insight-info">
                            <span className="insight-icon">{cat.icon}</span>
                            <span className="insight-name">{cat.name}</span>
                        </div>

                        <span className="insight-percentage">
                            {cat.percent.toFixed(2)}%
                        </span>

                        <span className="insight-amount">
                            ₹{cat.amount.toLocaleString("en-IN")}
                        </span>

                        <div
                            className="insight-bar"
                            style={{
                                "--bar-color": cat.color,
                                "--bar-width": cat.percent + "%",
                            } as React.CSSProperties}
                        ></div>
                    </div>))}
            </div>
        </div>
    );
}