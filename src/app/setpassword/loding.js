import React, { Suspense } from "react";
import SetPasswordPage from "../setpassword";

export default function SetPassword() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SetPasswordPage />
        </Suspense>
    );
}
