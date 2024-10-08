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
import { useSelector } from "react-redux";
const Blog = ({
  data,
  updateBlogs,
}: {
  data: IBlog;
  updateBlogs: (
    type: "UPDATE" | "DELETE" | "CREATE",
    values?: { title: string; desc: string },
    id?: string
  ) => void;
}) => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const auth = useSelector(
    (state: { auth: { _id: string; token: string } }) => state.auth
  );
  return (
    <Card className="animate-popup">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {data.title}

          <Popover>
            <PopoverTrigger asChild disabled={data.userId._id !== auth?._id}>
              <Button
                variant={"ghost"}
                className="px-3"
                disabled={data.userId._id !== auth?._id}
              >
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
                        updateBlogs(
                          "UPDATE",
                          res.data.payload as IBlog,
                          data._id
                        );
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
            <DialogTrigger
              className="w-full"
              disabled={data.userId._id !== auth?._id}
            >
              <Button
                variant="destructive"
                className="w-full mt-2 disabled:pointer-events-none"
                disabled={data.userId._id !== auth?._id}
              >
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
                          updateBlogs("DELETE", {} as IBlog, data._id);
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
