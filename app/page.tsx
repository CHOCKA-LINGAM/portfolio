
export default function Home() {
  return (
    <>
    <header style={{display:"flex"}}>
      <span>chocka.dev</span>
      <nav style={{ marginLeft:"auto"}}>
        <ul style={{display:"flex",listStyle:'none',gap:24}}>
          <li><a href="#skills">skills</a></li>
          <li><a href="#projects">projects</a></li>
          <li><a href="#contact">contact</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <p>hello chocka</p>
    </main>
    </>
  );
}
