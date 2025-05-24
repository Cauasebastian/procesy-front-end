import { Header } from "../../components/Header";
import * as S from './styles'
import ButtonBack from '../../assets/btn-back.svg'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CadastroClientes from "./CadastroCliente/CadastroClientes";
import { CadastroDocumentos } from "./CadastroDocumentos/CadastroDocumentos";
import { CadastroProcessos } from "./CadastroProcessos/CadastroProcessos";


export default function CadastroInformacoes() {
    const navigate = useNavigate();
    const [step, setStep] = useState('formA');

        const titles = {
        formA: 'Informações pessoais',
        formB: 'Documentos pessoais',
        formC: 'Dados dos processos',
        };
    return (
        <>
            <Header/>
            <S.Container>
                <S.ContainerGoBack onClick={() => navigate(-1)}>
                    <S.ImageArrow src={ButtonBack}/>
                    <S.TextBack>Cadastrar novo cliente</S.TextBack>
                </S.ContainerGoBack>
                <S.FormWrapper>
                    <S.HeaderContainerMessage>
                        <S.TextHeader>{titles[step]}</S.TextHeader>
                    </S.HeaderContainerMessage>
                    <S.TabBar>
                        <S.TabButton active={step === 'formA'} onClick={() =>setStep('formA')}>
                            Dados Pessoais
                        </S.TabButton>
                            <S.TabButton active={step === 'formB'} onClick={() => setStep('formB')}>
                            Documentos
                            </S.TabButton>
                            <S.TabButton active={step === 'formC'} onClick={() => setStep('formC')}>
                            Processo
                            </S.TabButton>
                    </S.TabBar>
                    {step === 'formA' && <CadastroClientes />}
                    {step === 'formB' && <CadastroDocumentos />}
                    {step === 'formC' && <CadastroProcessos />}
                </S.FormWrapper>
            </S.Container>
        </>
    )
}