export function formatText(text: string): string {
  return text.length > 5 ? text.slice(0, 5) + "..." : text;
}
export function shortenId(id: string): string {
  if (id.length <= 6) return id; // Nếu chuỗi quá ngắn thì không rút gọn
  return `${id.slice(0, 3)}...${id.slice(-3)}`;
}