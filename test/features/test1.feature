Feature: Verify Data in Dashboard Admin

    Background: Open browser Dashboard Admin
        Given Admin open dashboard and login

    Scenario: Assertion on Data Dashboar
        Then User can see data on Dashboar Admin like database
            | Line | ID  | userName | sourceBank | destinationBank | Amount       |
            | 1    | 011 | Smith    | BCA        | BRI             | Rp 1,000,000 |
            | 2    | 011 | Smith    | BCA        | BRI             | Rp 1,000,000 |
            | 3    | 100 | John     | BRI        | BCA             | Rp 1,000,000 |
            | 4    | 101 | Fulan    | Mandiri    | BCA             | Rp 4,333,011 |
            | 5    | 110 | Sri      | BNI        | BSI             | Rp 3,000,000 |
            | 6    | 111 | Bambang  | BCA        | BSI             | Rp 1,500,000 |
