const imgeAllTypes = {
  flying:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pok%C3%A9mon_Flying_Type_Icon.svg/768px-Pok%C3%A9mon_Flying_Type_Icon.svg.png',
  normal:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg/768px-Pok%C3%A9mon_Normal_Type_Icon.svg.png',
  fighting:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg/768px-Pok%C3%A9mon_Fighting_Type_Icon.svg.png',
  poison:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg/800px-Pok%C3%A9mon_Poison_Type_Icon.svg.png',
  ground:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg/768px-Pok%C3%A9mon_Ground_Type_Icon.svg.png',
  rock: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg/768px-Pok%C3%A9mon_Rock_Type_Icon.svg.png',
  bug: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg/768px-Pok%C3%A9mon_Bug_Type_Icon.svg.png',
  ghost:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pok%C3%A9mon_Ghost_Type_Icon.svg/768px-Pok%C3%A9mon_Ghost_Type_Icon.svg.png',
  steel:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg/768px-Pok%C3%A9mon_Steel_Type_Icon.svg.png',
  fire: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Pok%C3%A9mon_Fire_Type_Icon.svg/768px-Pok%C3%A9mon_Fire_Type_Icon.svg.png',
  water:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg/768px-Pok%C3%A9mon_Water_Type_Icon.svg.png',
  electric:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg/768px-Pok%C3%A9mon_Electric_Type_Icon.svg.png',
  psychic:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg/768px-Pok%C3%A9mon_Psychic_Type_Icon.svg.png',
  ice: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg/768px-Pok%C3%A9mon_Ice_Type_Icon.svg.png',
  grass:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pok%C3%A9mon_Grass_Type_Icon.svg/768px-Pok%C3%A9mon_Grass_Type_Icon.svg.png',
  dark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg/768px-Pok%C3%A9mon_Dark_Type_Icon.svg.png',
  fairy:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg/768px-Pok%C3%A9mon_Fairy_Type_Icon.svg.png',
  dragon:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg/768px-Pok%C3%A9mon_Dragon_Type_Icon.svg.png',
  unknown:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQgAAACZCAMAAADkZVSfAAAAYFBMVEX///8cnIhERERGqJuhz8Wo0MFQZ2UNPTFHq54sVlaWqKTn6NYbnYnV1seJm5cVUUETQzZ9n5dyjoiWwLiLsan4+eU7TUwUWFJbeXISRj8SOC9Js6aaxrx4mJGOraJBRAngEEwmAAAC80lEQVR4nO2c6XqqMBBAy1LArXXrKrbv/5bXGSPTzwoErBfMd86vWDs6c0qTEBMfHgAAAKA/sRdDZ3lz4ni1eWxlswpdRbxPd0WRtFAUu3QftIl4myaRF0m6DdhEvK48TPIsi+YNzSRdh2siToujhvlkOptNs/rmgSINVsSPCyKb5fni6bm+GfQlEX8Vpy5gkkfR90t2aua/mnJJBNtLxGUl4sBr9bevaRZlsCIef4hYzqZvjc2QRWwqEfN88f5xHB8uN8P+11iX1QWRL7LmZpSUwXaWh+HTplPLqKWZhDt8ygT7ZKL1ikjSVbgibIo9jz6r7uJiM+wpts6pSr+brnA7iCNyG562Ev5t+AMLMwAAAAAAAAAAMGL8Fq/GCiIciHAgwoEIxx+WvxI2QvsOxLGg6WriVytBBCIQgYgmB3tBP/vdCUVF24fmQ2OZauJaghbT3QYiEIEIRDQ52Ar6AvrK0V2jJWgxWpavDUQgAhGIaHKwFjo5mAi5kFXoE3NhJGFmQwtstoEIRCACEa0i9Jd1ftpcvr6vZjUVZhX60PIbNOwMLUsLRAQiEIGIXiJ6DhiagSaUVyyEJ+FZGD7M8Bg6EIEIRCCiVcSX4DFgGDbftZ99Cy9CbWd+KUwf3iTsDC2wdmUCEYhABCJaRZRCJxFnvAqd+vEBwrRALRURiBAQ4UCEw0OE7j3qKWIp2ArBmzC6MAURDkQ4EOFAhMNDhO7R7CRC11RtXeBd+BDs2eHDLolonmIjAhGIQESTCF3R1P7UV4RiqfkuCQwQpujirRbosYqNCEQgAhG/RZiNnttMddLbKWKAMPukq9YBIhCBCET4ibADTL427mLUMAd2FhQRiEAEIk50EmE2fI8y2RrAp+Cb1f8NMwe3O9OFiEEqQsR1YYhw9BRhNmz/qe0XUJKRY5naIXmPA0yIQAQiENFVhNlQ7OuX0rvhxt9DNXR5/iDCgQgHIhx/KOKSknvk6vIRgQhEIAIAAAAAAAAAAAAARsg/RNqGKpWQrHkAAAAASUVORK5CYII=',
  shadow:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg/768px-Pok%C3%A9mon_Dark_Type_Icon.svg.png',
};

export default imgeAllTypes;
