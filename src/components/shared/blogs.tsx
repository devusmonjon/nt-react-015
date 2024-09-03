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
import { useRef } from "react";
import axios from "@/api";
import { toast } from "sonner";

const Blogs = ({
  data,
  setupdateCount,
}: {
  data: IBlog[];
  setupdateCount: (prev: number) => void;
}) => {
  const form = useRef(null);
  console.log(data);
  return (
    <section className="py-10">
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
                        // @ts-ignore
                        setupdateCount((prev) => prev + 1);
                      })
                      .catch((err) => {
                        toast.error(err.response.data.msg, {
                          position: "top-center",
                        });
                      });
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
                    <Button variant="outline">Create post</Button>
                  </div>
                </form>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {data?.map((blog) => (
            <Blog data={blog} key={blog._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
