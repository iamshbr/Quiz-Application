export default function shuffleArray<Type>(arr: Type[]): Type[] {
  return [...arr].sort(() => Math.random() - 0.5);
}
