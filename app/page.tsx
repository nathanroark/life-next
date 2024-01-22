import { GameOfLife } from "@/components/game-of-life"

export default function IndexPage() {
  return (
    <div className="container relative flex justify-center p-8">
      <div>
        <GameOfLife />
      </div>
    </div>
  )
}
