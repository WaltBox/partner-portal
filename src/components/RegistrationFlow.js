import React, { useState } from "react";
import VerifyPartner from "../screens/VerifyPartner";
import CompleteRegistration from "../screens/CompleteRegistration";

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
