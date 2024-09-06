import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IBlog } from "@/interfaces";
import { Loader2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
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
const Blog = ({
  data,
  setData,
  setUpdateCount,
}: {
  data: IBlog;
  setData: (params: IBlog[]) => void;
  setUpdateCount: (param: (prev: number) => number) => void;
}) => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {data.title}

          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"ghost"} className="px-3">
                <Pencil size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Edit post</h4>
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
                      .patch(`/blogs/${data._id}`, values)
                      .then((res) => {
                        console.log(res.data);
                        toast.success("Successfully updated", {
                          position: "top-center",
                        });
                        setData([]);
                        // @ts-ignore
                        setUpdateCount((prev) => prev + 1);
                      })
                      .catch((err) => {
                        toast.error("You have not access to delete this post", {
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
                        "Edit post"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </PopoverContent>
          </Popover>
        </CardTitle>
        <CardDescription>{data.userId.fname}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{data.desc}</p>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <p className="text-sm text-muted-foreground text-right w-full">
            {new Date(data.createdAt).toDateString()}
          </p>
          <Dialog>
            <DialogTrigger className="w-full">
              <Button variant="destructive" className="w-full mt-2">
                DELETE
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>
                  <Button
                    variant={"destructive"}
                    className="mr-2"
                    onClick={() => {
                      const loadingT = toast.loading("Deleting...", {
                        position: "top-center",
                      });
                      axios
                        .delete(`/blogs/${data._id}`)
                        .then((res) => {
                          toast.success(res.data.msg, {
                            position: "top-center",
                            id: loadingT,
                          });
                        })
                        .catch((err) => {
                          toast.warning(err.response.data.msg, {
                            position: "top-center",
                            id: loadingT,
                          });
                        });
                    }}
                  >
                    DELETE
                  </Button>
                  <Button variant={"outline"}>CLOSE</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Blog;
