import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {

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
      <SignedOut>
        <div className="flex mt-8 w-1/2 space-x-4">
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
      </SignedOut>
      <SignedIn>
        <div className="flex mt-8 w-1/2 space-x-4">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Courses</h2>
              <p>View all avaiable courses.</p>
              <div className="card-actions justify-end">
                <Link href="/courses" className="btn btn-primary text-white">View Courses</Link>
              </div>
            </div>
          </div>

          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">My Account</h2>
              <p>View your account information.</p>
              <div className="card-actions justify-end">
                <Link href="/user" className="btn btn-primary text-white">View Account</Link>
              </div>
            </div>
          </div>
        </div>
      </SignedIn>
    </main>
  );
}
