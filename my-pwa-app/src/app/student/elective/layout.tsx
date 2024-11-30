export default function Schedule({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Факультативы</h2>
            {/* <p className="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our expert advice.</p> */}
          </div>
          {children}
        </div>
      </div>
    )
  }