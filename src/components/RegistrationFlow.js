import React, { useState } from "react";
import VerifyPartner from "./VerifyPartner";
import CompleteRegistration from "./CompleteRegistration";

const RegistrationFlow = () => {
  const [partner, setPartner] = useState(null);

  return (
    <div>
      {!partner ? (
        <VerifyPartner onVerified={(partner) => setPartner(partner)} />
      ) : (
        <CompleteRegistration partner={partner} />
      )}
    </div>
  );
};

export default RegistrationFlow;
