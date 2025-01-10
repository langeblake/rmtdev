type SidebarProps = {
  children: React.ReactNode;
};

export default function Sidebar({ children }: SidebarProps) {
  return <div className="sidebar">
    {children}
  </div>;
}

export function SidebarTop({ children }: SidebarProps) {
  return <div className="sidebar__top">
    {children}
  </div>;
}
