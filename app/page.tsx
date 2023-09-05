import { ComboboxDemo } from '@/components/combobox-demo';

export default function Home() {
  return (
    <main className="p-4 space-y-6">
      <div>
        <h1>Example search terms:</h1>
        <ul>
          <li>iphone</li>
          <li>samsung</li>
          <li>perfume</li>
        </ul>
      </div>

      <div>
        <ComboboxDemo />
      </div>
    </main>
  );
}
