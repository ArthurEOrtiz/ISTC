import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {

  return (
    <main className="container mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-4">
        Welcome to the Idaho State Tax Commission's Education Program
      </h1>

      <p className="text-lg">
        Discover a wide range of educational resources and tools to help you navigate tax matters effectively.
      </p>

      <p className="text-lg mt-4">
        Whether you're a taxpayer, tax professional, or simply interested in learning more about Idaho's tax system, we're here to support you every step of the way.
      </p>

      <div className="flex justify-between mt-8">

        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Sign in!</h2>
            <p>Sign in to your account.</p>
            <div className="card-actions justify-end">
              <Link href="/sign-in" className="btn btn-primary text-white">Sign in!</Link>
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Sign up!</h2>
            <p>Create an education account.</p>
            <div className="card-actions justify-end">
              <Link href="/sign-up" className="btn btn-primary text-white">Sign up!</Link>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
