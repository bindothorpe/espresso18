
export type MenuItemProps = {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
};

export default function MenuItem(props: MenuItemProps) {
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