import Link from "next/link";

export default function Maintenance() {

    return (
        <div className="text-white h-full w-full">
            <div className="flex items-center justify-center pt-10">
                <div className="flex flex-col gap-y-5 items-center">
                    <h1>Site Under Maintenance</h1>
                    <p>We'll be back soon.</p>

                    <Link href="/">
                        <button className="btn btn-primary">Back to home</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}