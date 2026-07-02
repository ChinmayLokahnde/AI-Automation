export default function VariablePicker({ onSelect }) {
  const variables = [
    {
      title: "Webhook",
      items: [
        { label: "Name", value: "{{webhook.name}}" },
        { label: "Email", value: "{{webhook.email}}" },
        { label: "Company", value: "{{webhook.company}}" },
      ],
    },
    {
      title: "AI",
      items: [
        { label: "Response", value: "{{openAi.text}}" },
      ],
    },
    {
      title: "HTTP",
      items: [
        { label: "Response", value: "{{http}}" },
      ],
    },
  ];

  return (
    <div className="border rounded-lg p-3 mt-2 bg-white shadow">
      {variables.map((group) => (
        <div key={group.title} className="mb-4">
          <h3 className="font-semibold mb-2">{group.title}</h3>

          {group.items.map((item) => (
            <button
              key={item.value}
              onClick={() => onSelect(item.value)}
              className="block w-full text-left p-2 rounded hover:bg-gray-100"
            >
              {item.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}