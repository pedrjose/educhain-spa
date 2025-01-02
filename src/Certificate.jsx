import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Certificate.css";

import educhain from "./assets/educhain.png";

const apiUrl = "http://localhost:3000/institution/validate-certificate";

export function CertificatePage() {
  const { hash } = useParams();

  const [authCertificate, setAuthCertificate] = useState("");
  const [certificateParams, setCertificateParams] = useState({
    promise: false,
    message: "Hash inválida. Tente novamente!",
    validate: {
      studentCPF: "",
      courseName: "",
      institutionCNPJ: "",
      certificateHash: "",
      studentName: "",
      courseDuration: "",
      teachingModality: "",
      startDate: "",
      graduationDate: "",
    },
  });

  const validateCertificate = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}`,
        { transactionHash: hash },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setAuthCertificate(`https://sepolia.etherscan.io/tx/${hash}`);
      setCertificateParams(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    validateCertificate();
  }, []);
  return (
    <>
      <section className="section-page-settings">
        <img src={educhain} className="img-settings" />
        {!certificateParams.promise ? (
          <p>{certificateParams.message}</p>
        ) : (
          <p className="certificate-message-settings">
            Atestamos que <b>{certificateParams.validate.studentName}</b>,
            portador do CPF <b>{certificateParams.validate.studentCPF}</b>,
            inscrito no curso de <b>{certificateParams.validate.courseName}</b>,
            de modalidade <b>{certificateParams.validate.teachingModality}</b>,
            fornecido pela instituição com Cadastro Nacional de Pessoas
            Jurídicas <b>{certificateParams.validate.institutionCNPJ}</b>,
            concluiu o curso em{" "}
            <b>{certificateParams.validate.graduationDate}</b>, tendo o iniciado
            em <b>{certificateParams.validate.startDate}</b>, com carga horário
            de <b>{certificateParams.validate.courseDuration}</b> horas.
          </p>
        )}
        <span className="hash-box">
          <b>
            <p>{hash}</p>
          </b>
          <p>______________________________________________________________</p>
          <p>Assinatura Digital da Transação</p>
        </span>
        <span className="hash-box">
          <b>
            <p>{certificateParams.validate.certificateHash}</p>
          </b>
          <p>______________________________________________________________</p>
          <p>Assinatura Digital do Certificado</p>
        </span>
        <Link to={authCertificate}>Verificar Autenticidade</Link>
      </section>
    </>
  );
}
