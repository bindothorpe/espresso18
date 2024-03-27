import { MenuItem as MenuItemData } from "@prisma/client";

export default function MenuItem(props: MenuItemData) {
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