import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IBlog } from "@/interfaces";

const Blog = ({ data }: { data: IBlog }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.userId.fname}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{data.desc}</p>
      </CardContent>
      <CardFooter>
        <p>{new Date(data.createdAt).toDateString()}</p>
      </CardFooter>
    </Card>
  );
};

export default Blog;
