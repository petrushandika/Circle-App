export interface Person {
  id: number;
  image: string;
  name: string;
  tag: string;
  time: string;
  content: string;
  imageUrl?: string;
  like: number;
  reply: number;
}

export const getData = (): Person[] => {
  return [
    {
      id: 1,
      image: "./images/bill.jpeg",
      name: "Bill Gates",
      tag: "billgates",
      time: "• 4h",
      content:
        "Kalian pernah ga sih bet on saving? Jadi by calculation sebenernya kita ga survive sampe tanggal tertentu. Tapi entah gimana bisa aja gitu. Ada aja jalannya augmented reality real time puppet I made. You can try it now went below in the thread.",
      like: 1470,
      reply: 350,
    },
    {
      id: 2,
      image: "./images/curry.jpeg",
      name: "Stephen Curry",
      tag: "stephencurry",
      time: "• 17h",
      content:
        "Pernah nggak dapet dream job lama-lama ngerasa lah kok tidak seperti yang diharapkan (atau simply lelah) terus fall out of love dengan job/bidang tsb",
      like: 470,
      reply: 50,
    },
    {
      id: 3,
      image: "./images/elizabeth.jpeg",
      name: "Elizabeth Umpel",
      tag: "elizabethumpel",
      time: "• 10h",
      content:
        "Dibanding rekan2 media menginterview saya terkait issue yg lg ramai, ada baiknya mending interview instansi yg ngasih izin, BKSDA dll, manfaatkan moment untuk mendorong regulasi nya jadi lebih ketat. Ketua mpr kita pak Bamsut juga pelihara singa, ga mau push berita ini aja?",
      like: 125,
      reply: 25,
    },
  ];
};
