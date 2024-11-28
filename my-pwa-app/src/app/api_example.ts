import { useQuery } from "@tanstack/react-query";

async function getData() {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/affiliation",
    {
      method: "GET",
      credentials: "include"
    }
  );
  const data = await response.json();

  return data;
}


async function postData(data : string) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/affiliation",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name : data}),
      }
    );
    return data;
  }


const {} = useQuery({
    queryKey: ["affiliation"],
    queryFn: () => getData(asldk) …,
});
    

function usePost(postId: string)
{
    return useQuery({
        queryKey: ["post", postId],
        queryFn: () => postData(postId),
    });
}