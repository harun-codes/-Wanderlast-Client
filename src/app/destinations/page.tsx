
import DestinationsGrid, {
  type Destination,
} from "@/components/DestinationsGrid";

export const dynamic = "force-dynamic";

const AllDestinationPages = async () => {
  let destinations: Destination[] = [];
  let fetchFailed = false;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_UR}/destinations`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch destinations: ${res.status}`
      );
    }

    const responseData = await res.json();

    // Supports either an array or an object containing an array
    destinations =
      Array.isArray(responseData)
        ? responseData
        : Array.isArray(responseData.destinations)
        ? responseData.destinations
        : Array.isArray(responseData.data)
        ? responseData.data
        : [];

  } catch (error) {
    console.error("Destination fetch error:", error);
    fetchFailed = true;
  }

  if (fetchFailed) {
    return (
      <main className="flex min-h-[400px] items-center justify-center px-5">
        <div className="text-center">
          <h2 className="text-xl font-medium">
            Unable to load destinations
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Please check your backend server at
            localhost:5000.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-white">
      <DestinationsGrid destinations={destinations} />
    </main>
  );
};

export default AllDestinationPages;
