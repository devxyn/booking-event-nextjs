const Home = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums");

  if (!response.ok) throw new Error("Error fetching data.");

  const albums = await response.json();

  return (
    <div>
      <ul>
        {albums.map((item: { userId: number; id: number; title: string }) => (
          <li key={item.id}>{`${item.id}. ${item.title}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
