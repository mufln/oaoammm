import Nav from "@/app/admin/panel/ui/nav";

export default function Score({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-pretty text-2xl md:text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Панель администрирования</h2>
          </div>
        <div className="flex">
            <Nav/>
            {children}
        </div>

        </div>
      </div>
    )
  }