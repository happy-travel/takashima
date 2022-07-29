const settings = {
    identityUrl: process.env.IDENTITY_URL,
    identityScope: 'openid profile email nakatsu',
    identityClientId: 'takashima',
    edo: () => process.env.NAKATSU_URL + 'api/1.0',
    pageTitleSuffix: 'Mapper – Happytravel.com',
};

export default settings;
