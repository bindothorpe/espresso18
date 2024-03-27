import { MenuItem } from "@prisma/client";

export default function MenuItem(props: MenuItem) {
    return (
        <div className="flex">
            <div className="flex-grow">
                {props.name}
            </div>
            <div>
                {props.price}
            </div>
        </div>
    )
}