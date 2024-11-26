// import React from "react";
import Card from "../components/Card/Card";
import { FaUsers, FaBriefcase, FaFileAlt } from "react-icons/fa";
import Chart from "../components/Chart/Chart";

function Home() {
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Clientes cadastrados",
        data: [10, 25, 15, 30, 50, 40, 60],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="card-container">
        <Card title="Clientes" value="150" icon={<FaUsers />} />
        <Card title="Processos" value="87" icon={<FaBriefcase />} />
        <Card title="Relatórios" value="23" icon={<FaFileAlt />} />
      </div>
      <Chart title="Crescimento de Clientes" data={chartData} />
    </div>
  );
}

export default Home;
