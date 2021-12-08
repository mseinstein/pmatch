export const QuizData = [
    {
        category: "price",
        question: `What is your preferred price range?`,
        options: [`$150-400`, `$400-800`, `$800-1000`, `$1000-1500`],
        mac_answer: `$800-1000`,
        hp_answer: `$1000-1500`,
        acer_answer: `$150-400`,
        asus_answer: `$400-800`,
        
    },
    {
        category: "software",
        question: `What software do you intend to use?`,
        options: [`Video Rendering Software/Graphics`, `Microsoft Suite`, `Gaming Software`, `Nothing Specific; Casual Use`],
        mac_answer: `Nothing Specific; Casual Use`,
        hp_answer: `Gaming Software`,
        acer_answer: `Microsoft Suite`,
        asus_answer: `Video Rendering Software/Graphics`,
    },
    {
        category: "storage",
        question: `How much storage do you need? \n If you are editing videos, intend to download many games, 
        or use graphic rendering software, extra storage is necessary. 256 GB is sufficient for casual browsing yet 
        1 TB is recommended for those purposes.`,
        options: ['256 GB', '512 GB', `1 TB`, `1 TB+`],
        mac_answer: `256 GB`,
        hp_answer: `240 GB`,
        acer_answer: '32 GB',
        asus_answer: '128 GB',
    },
    {
        category: "touch screen functionality",
        question: `Do you require Touch Screen Functionality?`,
        options: [`Yes`, `No`],
        mac_answer: `Yes`,
        hp_answer: `Yes`,
        acer_answer: `No`,
        asus_answer: 'No'
    },
    {
        category: "screen",
        question: `What is your preferred screen size? \n Screen size is measured as the length of the screen's diagonal. 
        15.6" is considered a standard size. 17.6" is generally reserved for gaming laptops and computing workstations. 
        13.6" is smaller and more portable. 
        11.6" is particularly small`,
        options: [`11.6 in`, `13.6 in`, `15.6 in`, `17.3 in`],
        mac_answer: `13.6 in`,
        hp_answer: `15.6 in`,
        acer_answer: `11.6 in`,
        asus_answer: `17.6 in`,
    },
    {
        category: "weight",
        question: `How heavy do you prefer your laptop to be? \n Most modern laptops are generally slim and similar in weight 
        yet gaming laptops commonly contain large fans and large screen laptops will be heavier. Consider ease of portability 
        or intended bag you would like to use to transport it.`,
        options: [`2.4-2.9lb`, `3-4lb`, '4.1-5.1lb', `5.5-8.5lb`],
        mac_answer: `3-4lb`,
        hp_answer: '4.1-5.1lb',
        acer_answer: `2.4-2.9lb`,
        asus_answer: `5.5-8.5lb`,
    },
]