const RegistrationRequest = () => {
  return (
    <div className="max-w-[650px] w-full rounded-sub-block-32 bg-gradient-sub-block p-[64px]">
      <h1 className="text-primary mobile:text-28 tablet:text-40 text-center font-bold mobile:mb-[30px] tablet:mb-[56px]">
        Заявка на регистрацию успешно отправлена
      </h1>
      <p className="text-secondary text-[22px] text-center font-medium mb-[56px]">
        Мы перезвоним Вам в течении часа для уточнения деталей.
      </p>
      <div className="text-secondary text-[19px] text-center mb-[15px] font-medium">
        В случае возникновения вопросов:
      </div>
      <div className="bg-gradient-red text-[22px] bg-clip-text text-transparent text-center font-bold">
        + 7 999 065 04 04
      </div>
    </div>
  );
};

export default RegistrationRequest;
