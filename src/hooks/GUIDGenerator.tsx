export default function GUID() {
  return "00000000-0000-4000-8000-000000000000".replace(/0/g, function () {
    return (0 | (Math.random() * 16)).toString(16);
  });
}
