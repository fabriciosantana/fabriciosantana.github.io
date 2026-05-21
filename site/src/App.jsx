import React, { useState } from "react";

import { digestIndex, digestsByFile } from "./content/digests/generated.js";
import profilePhoto from "./images/Fabricio.jpg";
import "./styles.css";

const courses = [
  {
    title: "Engenharia de Software",
    description: "Práticas, ferramentas e decisões técnicas para construir software com qualidade.",
    status: "Em breve",
  },
  {
    title: "Inteligência Artificial aplicada",
    description: "Conceitos e usos práticos de IA para profissionais de tecnologia e negócios.",
    status: "Em planejamento",
  },
  {
    title: "Cloud Computing",
    description: "Fundamentos de nuvem, arquitetura e operacao de sistemas modernos.",
    status: "Em breve",
  },
];

const digestPosts = digestIndex
  .map((entry) => ({
    ...entry,
    digest: digestsByFile[entry.file],
    slug: `resumo-${entry.date}`,
  }))
  .filter((entry) => entry.digest);

const formatDate = (date) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

const renderDigestMarkdown = (markdown) => {
  const escapeHtml = (value) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  const renderInline = (value) =>
    escapeHtml(value)
      .replace(/\*\*\[([^\]]+)\]\((https?:\/\/[^)]+)\)\*\*/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  return markdown
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      if (line.startsWith("### ")) {
        return `<h3>${renderInline(line.slice(4))}</h3>`;
      }

      if (line.startsWith("#### ")) {
        return `<h4>${renderInline(line.slice(5))}</h4>`;
      }

      if (line.startsWith("- ")) {
        return `<p class="digest-bullet">${renderInline(line.slice(2))}</p>`;
      }

      return `<p>${renderInline(line)}</p>`;
    })
    .join("");
};

const App = () => {
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const selectedDigestPost = digestPosts.find((post) => currentHash === `#${post.slug}`);

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    setNewsletterMessage("Obrigado! Seu interesse na newsletter foi registrado.");
  };

  React.useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (selectedDigestPost) {
    const selectedDigest = selectedDigestPost.digest;
    const selectedDigestItem = selectedDigest.items[0];

    return (
      <main className="site-shell">
        <header className="site-header">
          <a className="brand" href="#inicio" aria-label="Fabricio Santana">
            Fabricio Santana
          </a>
          <nav className="nav-links" aria-label="Navegacao principal">
            <a href="#sobre">Sobre</a>
            <a href="#cursos">Cursos</a>
            <a href="#conteudos">Conteúdos</a>
          </nav>
        </header>

        <article className="digest-detail-page">
          <a className="back-link" href="#conteudos">
            Voltar para conteúdos
          </a>
          <div className="digest-meta">
            <span>Resumo diário</span>
            <time dateTime={selectedDigest.date}>{formatDate(selectedDigest.date)}</time>
          </div>
          <h1>{selectedDigest.title}</h1>
          <div
            className="digest-content"
            dangerouslySetInnerHTML={{
              __html: renderDigestMarkdown(selectedDigestItem.summary),
            }}
          />
          <div className="digest-sources">
            <h4>Fontes citadas</h4>
            <ul>
              {selectedDigestItem.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.sourceName ? `${source.sourceName}: ` : ""}
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <footer className="site-footer">
          <p>Fabricio Santana</p>
          <a href="mailto:fabricio.santana@gmail.com">fabricio.santana@gmail.com</a>
        </footer>
      </main>
    );
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Fabricio Santana">
          Fabricio Santana
        </a>
        <nav className="nav-links" aria-label="Navegacao principal">
          <a href="#sobre">Sobre</a>
          <a href="#cursos">Cursos</a>
          <a href="#conteudos">Conteúdos</a>
        </nav>
      </header>

      <section className="intro-section" id="inicio">
        <div className="intro-copy">
          <p className="eyebrow">Tecnologia, ensino e gestão</p>
          <p className="intro-text">
            Sou Fabricio Santana, profissional de tecnologia com experiência em desenvolvimento
            de software, liderança técnica, computação em nuvem e ensino superior.
          </p>
          <p className="newsletter-callout">
            Receba meu resumo diário sobre tecnologia e inovação.
          </p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <div className="form-grid">
              <label>
                Nome
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label>
                E-mail
                <input type="email" name="email" autoComplete="email" required />
              </label>
            </div>
            <label className="consent-field">
              <input type="checkbox" name="privacyConsent" required />
              <span>
                Aceito os termos de privacidade e concordo em receber comunicações de Fabricio
                Santana.
              </span>
            </label>
            <button className="button primary" type="submit">
              Assinar newsletter
            </button>
            {newsletterMessage && <p className="form-message">{newsletterMessage}</p>}
          </form>
        </div>
        <img className="profile-photo" src={profilePhoto} alt="Fabricio Santana" />
      </section>

      <section className="content-section" id="sobre">
        <div className="section-heading">
          <p className="eyebrow">Sobre mim</p>
          <h2>Minha trajetória em tecnologia</h2>
        </div>
        <div className="text-panel">
          <p>
            Atuo há mais de 20 anos na área de tecnologia, conectando engenharia de software,
            gestão de times, cloud computing e inteligência artificial. Também leciono em cursos de
            graduação em Ciência da Computação e Engenharia de Software.
          </p>
          <p>
            Este espaço vai reunir cursos, materiais e textos sobre temas que acompanho de perto:
            arquitetura, desenvolvimento, IA, carreira, ensino e práticas modernas de TI.
          </p>
        </div>
      </section>

      <section className="content-section alternate" id="cursos">
        <div className="section-heading">
          <p className="eyebrow">Cursos</p>
          <h2>Aulas e cursos em desenvolvimento</h2>
        </div>
        <div className="card-grid">
          {courses.map((course) => (
            <article className="card" key={course.title}>
              <span className="status-label">{course.status}</span>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" id="conteudos">
        <div className="section-heading">
          <p className="eyebrow">Conteúdos sobre TI</p>
          <h2>Publicações e resumos de tecnologia</h2>
        </div>
        <div className="digest-list">
          {digestPosts.map((post) => (
            <a className="digest-card" href={`#${post.slug}`} key={post.date}>
              <div className="digest-meta">
                <span>Resumo diário</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <div className="digest-card-footer">
                <span>{post.sourceCount} fontes citadas</span>
                <strong>Ler resumo completo</strong>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <p>Fabricio Santana</p>
        <a href="mailto:fabricio.santana@gmail.com">fabricio.santana@gmail.com</a>
      </footer>
    </main>
  );
};

export default App;
