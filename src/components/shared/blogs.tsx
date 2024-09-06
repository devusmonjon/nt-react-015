import { IBlog } from "@/interfaces";
import Blog from "./blog";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useRef, useState } from "react";
import axios from "@/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const Blogs = ({ data: blogs, limit }: { data: IBlog[]; limit: number }) => {
  const [data, setData] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state: { auth: { token: string } }) => state.auth);
  const form = useRef(null);
  useEffect(() => {
    setData(blogs);
  }, [blogs]);
  const updateBlogs = (
    type: "UPDATE" | "DELETE" | "CREATE",
    values?: { title: string; desc: string },
    id?: string
  ) => {
    switch (type) {
      case "CREATE":
        // @ts-ignore
        setData([values as IBlog, ...data]);
        break;
      case "DELETE":
        setData(data.filter((blog) => blog._id !== id));
        break;
      case "UPDATE":
        setData(data.map((blog) => (blog._id === id ? values : blog) as IBlog));
        break;
      default:
        break;
    }
  };
  return (
    <section className="pt-10 pb-4">
      <div className="container">
        <div className="flex justify-between items-center pb-4">
          <h2 className="font-bold text-2xl">Blogs</h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Create post</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Create post</h4>
                  <p className="text-sm text-muted-foreground">
                    Fill all fields
                  </p>
                </div>
                <form
                  className="grid gap-2"
                  ref={form}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setLoading(true);
                    const formData = form.current
                      ? new FormData(form.current)
                      : false;
                    const values = formData
                      ? {
                          title: formData?.get("title"),
                          desc: formData?.get("desc"),
                        }
                      : {};
                    axios
                      .post("/blogs", values)
                      .then((res) => {
                        console.log(res.data);
                        toast.success(res.data.msg, {
                          position: "top-center",
                        });
                        updateBlogs("CREATE", res.data.payload as IBlog);
                      })
                      .catch((err) => {
                        toast.error(err.response.data.msg, {
                          position: "top-center",
                        });
                      })
                      .finally(() => setLoading(false));
                  }}
                >
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue="Post title"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="desc">Desc</Label>
                    <Input
                      id="desc"
                      name="desc"
                      defaultValue="Post description"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Button
                      type="submit"
                      variant={"outline"}
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </>
                      ) : (
                        "Create post"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.map((blog) => (
            // @ts-ignore
            <Blog data={blog} key={blog._id} updateBlogs={updateBlogs} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
