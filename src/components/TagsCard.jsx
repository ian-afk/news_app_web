function TagsCard({ tags, count, id, showNews }) {
  return (
    <div
      key={id}
      className="border-1 rounded-md p-2"
      onClick={() => showNews({ id, tagName: tags })}
    >
      <p className="text-lg font-semibold">#{tags}</p>
      <p className="text-gray-500">{count} Post</p>
    </div>
  );
}

export default TagsCard;
