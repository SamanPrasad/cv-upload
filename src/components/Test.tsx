import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function Test() {
  let name = "Jerome";

  const change = () => {
    name = "Valeska";
    console.log(name);
  };

  return (
    <div>
      <h1>{name}</h1>
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={change}
      >
        Create Candidate
      </button>
    </div>
  );
}

export default Test;
