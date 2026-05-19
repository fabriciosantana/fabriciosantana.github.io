import React from "react";

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

const articles = [
  {
    title: "Arquitetura de software",
    description: "Reflexões sobre desenho de sistemas, trade-offs e manutenção de longo prazo.",
  },
  {
    title: "Carreira em TI",
    description: "Textos sobre liderança, formação de equipes e crescimento profissional.",
  },
  {
    title: "IA e desenvolvimento",
    description: "Conteúdos sobre como a inteligência artificial está mudando a prática de software.",
  },
];

const App = () => {
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
          <h1>Tecnologia.</h1>
          <p className="intro-text">
            Sou Fabricio Santana, profissional de tecnologia com experiência em desenvolvimento
            de software, liderança técnica, computação em nuvem e ensino superior.
          </p>
          <div className="intro-actions">
            <a className="button primary" href="#cursos">
              Ver cursos
            </a>
            <a className="button secondary" href="#conteudos">
              Ler conteúdos
            </a>
          </div>
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
          <h2>Textos sobre tecnologia e carreira</h2>
        </div>
        <div className="article-list">
          {articles.map((article) => (
            <article className="article-item" key={article.title}>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </article>
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
