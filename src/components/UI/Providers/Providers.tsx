import { FC, ReactNode } from "react";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { RecoilRoot } from "recoil";

interface IProvdersProps {
  children: ReactNode;
  session: Session;
}
const Providers: FC<IProvdersProps> = ({ children, session }) => {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>{children}</SessionProvider>
    </RecoilRoot>
  );
};

export default Providers;
