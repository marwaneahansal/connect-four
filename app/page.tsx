import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="mt-10">
      <div className="max-w-2xl mx-auto flex items-center justify-between p-4">
        <Button size={"sm"}>Menu</Button>
        <div className="grid grid-cols-2 gap-2 group">
          <div className="w-4 h-4 bg-red-500 rounded-full outline-2 outline-foreground group-hover:-translate-y-0.5 transition ease-out duration-75" />
          <div className="w-4 h-4 bg-yellow-500 rounded-full outline-2 outline-foreground group-hover:-translate-y-0.5 transition ease-out duration-75" />
          <div className="w-4 h-4 bg-yellow-500 rounded-full outline-2 outline-foreground group-hover:-translate-y-0.5 transition ease-out duration-75" />
          <div className="w-4 h-4 bg-red-500 rounded-full outline-2 outline-foreground group-hover:-translate-y-0.5 transition ease-out duration-75" />
        </div>
        <Button size={"sm"}>Restart</Button>
      </div>

      <div className="px-4 py-6 max-w-2xl mx-auto aspect-[7/6] bg-card rounded-lg shadow-md outline-2 outline-offset-2 outline-foreground mt-8">
        <div className="grid grid-rows-6 gap-1 gap-y-4 p-1">
          {Array.from({ length: 6 }, (_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }, (_, colIndex) => (
                <div
                  key={colIndex}
                  className="mx-auto w-16 h-16 bg-background border border-border rounded-full flex items-center justify-center"
                >
                  {/* Game piece */}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
