import React from "react";
import { ClipLoader } from "react-spinners";

function Fallback() {
  return (
    <div className="w-100 h-100 ">
      <div className="d-flex w-100 h-100 justify-content-center align-items-center">
        <ClipLoader
          color="#0d6efd"
          loading={true}
          cssOverride={{
            display: "block",
          }}
          size={150}
        />
      </div>
    </div>
  );
}

export default React.memo(Fallback);
