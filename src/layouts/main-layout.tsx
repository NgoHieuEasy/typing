interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return <div id="main-scroll">{children}</div>;
};

export default MainLayout;
