import { TagIcon } from "@sanity/icons"; // replace with your own icon
import { disconnect } from "process";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
    name: "sale",
    title: "Sale",
    type: "document",
    icon: TagIcon,
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Sale Description",
            type: "text",
        }),
        defineField({
            name:"discountAmount",
            title:"Discount Amount",
            type:"number",
            description:"Amount off in persentage or fixed value",
        }),
        defineField({
            name:"couponCode",
            type:"string",
            title:"Coupon Code",
        }),
        defineField({
            name:"validFrom",
            type:"datetime",
            title:"Valid From",
        }),
        defineField({
            name:"validUntil",
            type:"datetime",
            title:"Valid Until",
        }),
        defineField({
            name:"isActive",
            type:"boolean",
            title:"Is Active",
            description:"Toggle to activate or deactivate the sale",
            initialValue: true,
        }),
        
    ],
    preview: {
        select: {
            title: "title",
            disconnectAmount: "discountAmount",
            coupenCode: "couponCode",
            isActive: "isActive",
        },
        prepare(selection) {
            const { title, disconnectAmount, coupenCode, isActive } = selection;
             const status = isActive ? "Active" : "Inactive";
            return {
                title,
                subtitle: `${disconnectAmount}% off -code: ${coupenCode} -${status} `,
            };
        },
    },
})
// defineField({
//     name: "slug",
//     title: "Slug",
//     type: "slug",
//     options: {
    //         source: "title",
//     },
// }),
          
    // defineField({
    //     name: "image",
    //     title: "Image",
    //     type: "image",
    //     options: {
    //         hotspot: true,
    //     },
    // })