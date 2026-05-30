"use client";

interface CategoryPillsProps {
  categories: { id: number; name: string; color: string }[];
  selectedIds: number[];
  onToggle: (id: number) => void;
}

export default function CategoryPills({
  categories,
  selectedIds,
  onToggle,
}: CategoryPillsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 px-1">
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {categories.map((cat) => {
        const isSelected = selectedIds.includes(cat.id);
        return (
          <button
            key={cat.id}
            onClick={() => onToggle(cat.id)}
            className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border whitespace-nowrap"
            style={
              isSelected
                ? {
                    backgroundColor: cat.color,
                    borderColor: cat.color,
                    color: "#ffffff",
                  }
                : {
                    backgroundColor: "#000000",
                    borderColor: cat.color,
                    color: cat.color,
                  }
            }
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
