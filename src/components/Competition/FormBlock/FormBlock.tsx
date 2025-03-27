import Container from '@/components/Container/Container';
import Form from './Form';
import VideoBlock from './VideoBlock';

const FormBlock = () => {
  return (
    <section
      id="form"
      className="pt-8 tabletplus:pt-[110px] pb-20 tabletplus:pb-[210px]"
    >
      <Container>
        <div className="flex flex-col tablet:flex-row tablet:items-stretch">
          <Form />
          <VideoBlock />
        </div>
      </Container>
    </section>
  );
};

export default FormBlock;
