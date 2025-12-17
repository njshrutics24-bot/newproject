"use client";
export default function Home() {
  function submit() {
    alert ("you clicked the button");
  }
  return (
    <div>
      <h1 className="text-3xL 
      text-yellow-500"
      font-black>hello</h1>

      <button className="bg-yellow-500
      text-black text-3xL p-4 rounded-5xL
      animate-bounce">
      click here!
      </button>
    </div>
  );
}