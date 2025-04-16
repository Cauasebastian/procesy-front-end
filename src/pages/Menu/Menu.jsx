import { BoxInformation } from '../../components/BoxInformation';
import { Header } from '../../components/Header/index';
import { SectionCurrentProcess } from '../../components/SectionProcessos';
import * as S from './styles';
import { useProcess } from '../../contexts/ProcessContext';

const Menu = () => {
  const {
    process,
    completedProcess,
    inProgressProcess,
    uninitiatedProcess,
    totalProcess,
  } = useProcess();

  return (
    <>
      <Header />
      <S.ContainerMenu>
        <BoxInformation
          total={totalProcess ?? 0}
          inProgress={inProgressProcess ?? 0}
          uninitiated={uninitiatedProcess ?? 0}
          completed={completedProcess ?? 0}
        />
        <SectionCurrentProcess allProcess={process}/>
      </S.ContainerMenu>
    </>
  );
};

export default Menu;
