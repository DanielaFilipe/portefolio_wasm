// src/App.tsx
import React from "react";
import StudentProfile from "./StudentProfile";
import WasmGameOfLife from "./WasmGameOfLife";

const App: React.FC = () => {
  const studentData = {
    name: "Daniela Filipe",
    studentNumber: "30009692",
    education: [
      "Universidade Autónoma de Lisboa",
      "Engenharia Informática e de Telecomunicações",
    ],
    biography: [
      "Daniela Filipe é uma jovem angolana apaixonada por conhecimento e descoberta. Estudante dedicada, ela equilibra seus estudos com hobbies que refletem sua curiosidade e criatividade: a leitura, que a transporta para novos mundos, e a culinária, onde transforma ingredientes em momentos especiais. Com raízes firmes em Angola, Daniela trilha seu caminho com determinação, buscando crescer pessoal e academicamente a cada dia.",
    ],
    career: ["Estudante"],
    hobbies: ["ler", "cozinhar"],
    webDevSkills: ["Python", "MySQL", "Word", "Excel", "PowerPoint"],
  };

  return (
    <div className="App">
      <h1>Student Profile</h1>
      <StudentProfile {...studentData} />

      {/* Secção WebAssembly */}
      <WasmGameOfLife />
    </div>
  );
};

export default App;
